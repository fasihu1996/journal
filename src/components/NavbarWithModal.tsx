"use client";

import Navbar from "./Navbar";
import EntryFormModal from "./EntryFormModal";
import { useState } from "react";

export default function NavbarWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewEntryClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEntryAdded = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("entriesUpdated"));
    }
  };

  return (
    <>
      <Navbar onNewEntryClick={handleNewEntryClick} />
      <EntryFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEntryAdded={handleEntryAdded}
      />
    </>
  );
}
