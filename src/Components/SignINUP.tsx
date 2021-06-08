import React from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { Button, Input, InputGroup, InputLeftAddon, InputRightElement, Stack, Icon } from '@chakra-ui/react';
import { Flex, Heading, Link } from '@chakra-ui/layout';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser } from "react-icons/fa"

export default function SignINUP() {

    const [show, setShow] = React.useState(false)
    const [isRegistered, setRegistered] = React.useState(true)
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [name, setName] = React.useState()
    const handleClick = () => setShow(!show)

    const history = useHistory()

    const go = async(path: string) => {
      history.replace(path)
    }

    const handleSubmit = async() => {
      if(isRegistered) console.log({email, password})
      else console.log({name, email, password})
    }
  
    return (
        <Flex height="90vh" alignItems="center" justifyContent="center">
          <Flex bg="green" rounded="6px" flexDir="column" alignItems="center" padding="10px">
            <Heading mb="12px">{isRegistered? "LOG IN" : "REGISTER"}</Heading>
            <Stack mb="10px">
              {!isRegistered && <InputGroup md="10px">
                  <InputLeftAddon><Icon as={FaUser}/></InputLeftAddon>
                  <Input placeholder="Name"
                  value={name}
                  onChange={(event: any) => setName(event.target.value)}/>
                </InputGroup>
                }
              <InputGroup mb="10px">
                <InputLeftAddon children={<EmailIcon/>} />
                <Input type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children={<LockIcon/>} />
                <Input 
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event: any) => setPassword(event.target.value)}
                />
                <InputRightElement pr="5px">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <ViewIcon/> : <ViewOffIcon/>}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Button onClick={() => handleSubmit()}>{isRegistered? "Sign IN" : "Sign UP"}</Button>
            <Link onClick={() => setRegistered(!isRegistered)}>{isRegistered? "New User! Register" : "Back to Log IN"}</Link>
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