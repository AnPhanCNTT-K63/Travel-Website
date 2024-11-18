import React from "react";

export default function DetailCard({item}){
    <CardMedia
        sx={{ height: "150px ", width: "100%", objectFit: "cover" }}
        image={`/${item.image}`}
        title="green iguana"
      />
}