import Image from "next/image";

export function GarageQRCode() {
  return (
    <div className="flex h-[96px] w-full shrink-0 items-center justify-center md:w-[96px]">
      <Image
        src="/qr-code.png"
        alt="QR Code da garagem"
        width={88}
        height={88}
        className="object-contain"
      />
    </div>
  );
}
