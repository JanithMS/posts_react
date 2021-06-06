import React from "react"
import { Button } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import EditPost from "./EditPost";
import "./ViewPost.css";

export default function ViewPost({post}: {post: string}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex className="post-container">
            <Flex>{post}</Flex>
            <Flex>The virus that causes COVID-19 is mainly transmitted through droplets generated when an infected person coughs, sneezes, or exhales. These droplets are too heavy to hang in the air, and quickly fall on floors or surfaces.
You can be infected by breathing in the virus if you are within close proximity of someone who has COVID-19, or by touching a contaminated surface and then your eyes, nose or mouth.</Flex>
            <Flex width="310px" justify="space-evenly">
                <Button size="sm" onClick={onOpen}><EditIcon/></Button>
                <Button size="sm"><DeleteIcon/></Button>
            </Flex>
            <EditPost isOpen={isOpen} onClose={onClose} post={post}/>
        </Flex>
    );
}