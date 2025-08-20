"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import AddCityDialog from "@/components/AddCityDialog";

export default function AddCityButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Додати місто
      </Button>
      <AddCityDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
