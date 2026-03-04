interface VideoPreviewProps {
  draft: any;
}

export default function VideoPreview({ draft }: VideoPreviewProps) {
  const style = draft?.style || 'fade';

  return (
    <div className="relative w-full max-w-sm aspect-[9/16] bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden shadow-2xl">
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center ${
        style === 'fade' ? 'animate-pulse' : style === 'slide' ? 'animate-slide' : 'animate-zoom'
      }`}>
        <h2 className="text-3xl font-bold text-white mb-4">{draft?.businessName || 'Your Business'}</h2>
        <p className="text-lg text-white/90 mb-6">{draft?.serviceProduct || 'Your Service'}</p>
        {draft?.offers && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white font-semibold">{draft.offers}</p>
          </div>
        )}
      </div>
    </div>
  );
}
