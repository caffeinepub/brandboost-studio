import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Message = {
    id : Nat;
    sender : Principal;
    content : Text;
    timestamp : Int;
  };

  public type Conversation = {
    id : Nat;
    participants : [Principal];
    messages : [Message];
  };

  public type GalleryItem = {
    id : Nat;
    owner : Principal;
    itemType : GalleryItemType;
    title : Text;
    url : Text;
    timestamp : Int;
  };

  public type GalleryItemType = {
    #photo;
    #video;
    #analytic;
  };

  public type UserProfile = {
    name : Text;
  };

  var nextMessageId = 0;
  var nextConversationId = 0;
  var nextGalleryItemId = 0;

  let conversations = Map.empty<Nat, Conversation>();
  let gallery = Map.empty<Nat, GalleryItem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  func containsPrincipal(array : [Principal], value : Principal) : Bool {
    for (x in array.values()) {
      if (x == value) { return true };
    };
    false;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func sendMessage(conversationId : Nat, content : Text) : async Message {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be a registered user to send messages");
    };

    let timestamp = Time.now();
    let message : Message = {
      id = nextMessageId;
      sender = caller;
      content;
      timestamp;
    };

    switch (conversations.get(conversationId)) {
      case (null) { Runtime.trap("Conversation not found") };
      case (?conversation) {
        if (not containsPrincipal(conversation.participants, caller)) {
          Runtime.trap("Unauthorized: Not a participant in this conversation");
        };

        let mutableMessages = List.fromArray<Message>(conversation.messages);
        mutableMessages.add(message);
        let updatedConversation : Conversation = {
          conversation with
          messages = mutableMessages.toArray()
        };

        conversations.add(conversationId, updatedConversation);
        nextMessageId += 1;
        message;
      };
    };
  };

  public shared ({ caller }) func createConversation(participants : [Principal]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be a registered user to create conversations");
    };

    if (participants.size() == 0) { Runtime.trap("Cannot create conversation without participants") };

    if (not containsPrincipal(participants, caller)) {
      Runtime.trap("Unauthorized: Creator must be a participant in the conversation");
    };

    let conversation : Conversation = {
      id = nextConversationId;
      participants;
      messages = [];
    };
    conversations.add(nextConversationId, conversation);
    nextConversationId += 1;
    nextConversationId - 1;
  };

  public shared ({ caller }) func addGalleryItem(itemType : GalleryItemType, title : Text, url : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only signed-in users can add gallery items");
    };

    let timestamp = Time.now();
    let item : GalleryItem = {
      id = nextGalleryItemId;
      owner = caller;
      itemType;
      title;
      url;
      timestamp;
    };

    gallery.add(nextGalleryItemId, item);
    nextGalleryItemId += 1;
    nextGalleryItemId - 1;
  };

  public query ({ caller }) func getGalleryByType(itemType : ?GalleryItemType) : async [GalleryItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be a registered user to view gallery");
    };

    let filtered = if (itemType == null) {
      gallery.values().toArray().filter(func(item) { item.owner == caller });
    } else {
      gallery.values().toArray().filter(
        func(item) {
          item.owner == caller and (
            switch (itemType, item.itemType) {
              case (?t, t2) { t == t2 };
              case (null, _) { false };
            }
          );
        }
      );
    };
    filtered.reverse();
  };

  public query ({ caller }) func getConversations() : async [Conversation] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be a registered user to get conversations");
    };

    conversations.values().toArray().filter(
      func(conv) { containsPrincipal(conv.participants, caller) }
    );
  };
};
