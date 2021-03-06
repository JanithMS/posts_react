import React from "react";
import { useHistory } from "react-router";
import { Button, Input, InputGroup, InputLeftAddon, InputRightElement, Stack, Icon, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Flex, Heading, Link } from '@chakra-ui/layout';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser } from "react-icons/fa"
import { Field, Form, Formik } from "formik";
import { RegisterComponent } from "../generated/graphql";

interface Probs {
    isRegistered: boolean,
    setIsRegistered: Function,
    setUserName: Function
}

interface RegisterFormValues {
    username: string,
    email: string,
    password: string
}

export default function Register(props: React.PropsWithChildren<Probs>) {

    const {isRegistered, setIsRegistered, setUserName} = props;

    const [show, setShow] = React.useState(true)
    const handleClick = () => setShow(!show)

    const history = useHistory()
    const go = async(path: string) => {
      history.replace(path)
    }

    const initialValues: RegisterFormValues = {username:"",email: "", password:""}

    return (
      <Flex height="90vh" alignItems="center" justifyContent="center">
          <RegisterComponent>
              {register => (
                <Formik
                    initialValues = {initialValues}
                    onSubmit = {async (values, actions) => {
                        try {
                            const response = await register({
                                variables: {
                                    user: values
                                },
                            });
                            setUserName(response.data?.register.username);
                            go("/home");
                        } catch (err) {
                            const errors: { [key: string]: string } = {};
                            errors["message"] = err.graphQLErrors[0].message;
                            if(errors.message.includes("duplicate key value violates unique constraint")) errors["message"] = "Email exits!"
                            if(err.graphQLErrors[0].validationErrors) {
                                err.graphQLErrors[0].validationErrors.forEach(
                                (validationErr: any) => {
                                    Object.values(validationErr.constraints).forEach(
                                    (message: any) => {
                                        errors[validationErr.property] = message;
                                    }
                                    );
                                }
                                );
                            }
                            actions.setErrors(errors);
                          }
                    }}
                    >
                    {(props) => (
                    <Form>
                        <Flex bg="#d1d1d1" rounded="6px" flexDir="column" alignItems="center" padding="10px" box-shadow=" 1px 3px 5px  rgba(0,0,0,0.1)">
                            <Heading mb="12px">REGISTER</Heading>
                            <Stack mb="10px">
                                <Field name="username">
                                    {({ field, form}: {field: any, form: any}) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name} isRequired={true}>
                                        <InputGroup md="10px">
                                        <InputLeftAddon><Icon as={FaUser}/></InputLeftAddon>
                                        <Input
                                            {...field}
                                            id="username"
                                            name="username"
                                            placeholder="Name"
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name="email">
                                {({ field, form}: {field: any, form: any}) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}  isRequired={true}>
                                        <InputGroup md="10px">
                                        <InputLeftAddon children={<EmailIcon/>} />
                                        <Input
                                            {...field}
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter Email"
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                {({ field, form}: {field: any, form: any}) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}  isRequired={true}>
                                        <InputGroup>
                                            <InputLeftAddon children={<LockIcon/>} />
                                            <Input
                                                {...field}
                                                id="password"
                                                name="password"
                                                type={show ? "text" : "password"}
                                                placeholder="Enter Password"
                                            />
                                            <InputRightElement pr="5px">
                                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                                {show ? <ViewOffIcon/> : <ViewIcon/>}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        {form.errors.message &&<Flex justifyContent="center" fontSize="20px" color="red">{form.errors.message}</Flex>}
                                    </FormControl>
                                    )}
                                </Field>
                            </Stack>
                            <Button type="submit" isLoading={props.isSubmitting}>Sign UP</Button>
                            <Link onClick={() => setIsRegistered(!isRegistered)}>Back to Log IN</Link>
                            </Flex>
                        </Form>
                        )}
                    </Formik>
              )}
          </RegisterComponent>
      </Flex>
    );
}