import React from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function AddPost({isOpen, onClose}: {isOpen: boolean, onClose: ()=>void}) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea placeholder="Enter New Post"/>
            </ModalBody>

            <ModalFooter>
              <Button mt="10px" isFullWidth={true} onClick={onClose}><AddIcon/></Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    );
}