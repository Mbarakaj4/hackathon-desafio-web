/* eslint-disable react/prop-types */
import { Card, CardHeader, Image } from "@nextui-org/react";

export default function Imagenes({ photos }) {
  const photo = photos[0];
  return (
    <section className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 place-items-center">
      <Card className="col-span-12 row-span-1">
        <CardHeader>
          <Image src={photo} className="rounded-md w-[750px]" />
        </CardHeader>
      </Card>
    </section>
  );
}
