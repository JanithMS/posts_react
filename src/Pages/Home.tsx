import React from "react";
import { useHistory} from "react-router";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import AddPost from "../Components/AddPost";
import Posts from "../Components/Posts";

export default function Home() {

    const history = useHistory()

    const go = async(path: string) => {
        history.replace(path)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex direction="column">
            <Flex>
                <Button onClick={onOpen}>Add Post</Button>
                <Button onClick={() => go("/")}>Log Out</Button>
            </Flex>
            <AddPost isOpen={isOpen} onClose={onClose} />
            <Posts/>
        </Flex>
    );
}