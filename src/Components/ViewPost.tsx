import React from "react"
import { Button } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import EditPost from "./EditPost";
import "./ViewPost.css";
import { useDeletePostMutation } from "../generated/graphql";

export default function ViewPost({post, postID, reFresh, setReFresh}: {post: string, postID: number, reFresh: boolean, setReFresh: Function}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deletePostMutation] = useDeletePostMutation({
      variables: {
         postID: parseFloat(postID.toString())
      },
    });
    const handleClick = () => {
        deletePostMutation();
        setReFresh(!reFresh);
    }
    return (
        <Flex className="post-container">
            <Flex mb="10px">{post}</Flex>
            <Flex width="310px" justify="space-evenly">
                <Button size="sm" onClick={onOpen}><EditIcon/></Button>
                <Button size="sm" onClick={handleClick}><DeleteIcon/></Button>
            </Flex>
            <EditPost isOpen={isOpen} onClose={onClose} post={post} postID={postID}/>
        </Flex>
    );
}