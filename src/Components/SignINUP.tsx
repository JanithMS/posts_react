import React from "react";
import { useHistory } from "react-router";
import { Button, Input, InputGroup, InputLeftAddon, InputRightElement, Stack } from '@chakra-ui/react';
import { Flex, Heading, Link } from '@chakra-ui/layout';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignINUP() {

    const [show, setShow] = React.useState(false)
    const [isRegistered, setRegistered] = React.useState(false)
    const handleClick = () => setShow(!show)

    const history = useHistory()

    const go = async(path: string) => {
      history.replace(path)
    }
  
    return (
        <Flex height="90vh" alignItems="center" justifyContent="center">
          <Flex bg="green" rounded="6px" flexDir="column" alignItems="center" padding="10px">
            <Heading mb="12px">{isRegistered? "REGISTER" : "LOG IN"}</Heading>
            <Stack mb="10px">
              <InputGroup mb="10px">
                <InputLeftAddon children={<EmailIcon/>} />
                <Input type="email" placeholder="Enter Email" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children={<LockIcon/>} />
                <Input 
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                />
                <InputRightElement pr="5px">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <ViewIcon/> : <ViewOffIcon/>}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Button onClick={() => go("/home")}>{isRegistered? "Sign UP" : "Sign IN"}</Button>
            <Link onClick={() => setRegistered(!isRegistered)}>{isRegistered? "Back to Log IN" : "New User! Register"}</Link>
            {/* <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup> */}
          </Flex>
        </Flex>
      );
}