import React from "react";
import { useHistory } from "react-router";
import { Button, Input, InputGroup, InputLeftAddon, InputRightElement, Stack, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Flex, Heading, Link } from '@chakra-ui/layout';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, Form, Formik } from "formik";
import { LoginComponent } from "../generated/graphql";

interface Probs {
    isRegistered: boolean,
    setIsRegistered: Function
}

interface RegisterFormValues {
    email: string,
    password: string
}

export default function Register(props: React.PropsWithChildren<Probs>) {

    const {isRegistered, setIsRegistered} = props;

    const [show, setShow] = React.useState(true)
    const handleClick = () => setShow(!show)

    const history = useHistory()
    const go = async(path: string) => {
      history.replace(path)
    }

    const initialValues: RegisterFormValues = {email: "", password:""}

    return (
      <Flex height="90vh" alignItems="center" justifyContent="center">
          <LoginComponent>
              {login => (
              <Formik
                initialValues = {initialValues}
                onSubmit = {async (values, actions) => {
                    try {
                        const response = await login({
                            variables: {
                                user: values
                            },
                            });
                            console.log(response);
                            go("/home");
                    } catch (err) {
                        const errors: { [key: string]: string } = {};
                        errors["message"] = err.graphQLErrors[0].message;
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
                    <Flex bg="green" rounded="6px" flexDir="column" alignItems="center" padding="10px">
                        <Heading mb="12px">LOG IN</Heading>
                        <Stack mb="10px">
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
                        <Button type="submit" isLoading={props.isSubmitting}>Sign IN</Button>
                        <Link onClick={() => setIsRegistered(!isRegistered)}>New User! Register</Link>
                        </Flex>
                    </Form>
                    )}
                </Formik>
              )}
          </LoginComponent>
      </Flex>
    );
}