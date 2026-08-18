import Image from "next/image";
import type { MediaAsset } from "@/content/site-content";

type MediaFrameProps = {
  asset: MediaAsset;
  className?: string;
  priority?: boolean;
  caption?: boolean;
  sizes?: string;
};

export function MediaFrame({
  asset,
  className = "",
  priority = false,
  caption = true,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: MediaFrameProps) {
  return (
    <figure className={`media-frame ${className}`}>
      <Image
        alt={asset.alt}
        className="media-frame__image"
        fill
        priority={priority}
        sizes={sizes}
        src={asset.src}
        style={asset.focus ? { objectPosition: asset.focus } : undefined}
        unoptimized={asset.src.endsWith(".svg")}
      />
      {caption ? <figcaption>{asset.caption}</figcaption> : null}
    </figure>
  );
}
