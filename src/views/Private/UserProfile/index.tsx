import "../../../css/instituicoes.css";
import { Box, HStack } from "@chakra-ui/layout";
import {
  Text,
  FormControl,
  FormLabel,
  Center,
  Button,
  Divider,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputText from "../../../components/InputText";
import InputPassword from "../../../components/InputPassword";
import InputCPF from "../../../components/InputCPF";
import InputPhone from "../../../components/InputPhone";
import { useAuthDispatch, useAuthState } from "../../../context";
import { httpClient } from "../../../services/httpClient";

interface Props {}

const UserProfile = (props: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 576px)");
  const userDetails = useAuthState();
  const dispatch = useAuthDispatch();
  const toast = useToast();
  const { password, address, verified, ...others } = userDetails.user;

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ defaultValues: { address: { ...address }, ...others } });

  const onSubmit = async (data: any) => {
    try {
      const req = await httpClient<any>({
        method: "PUT",
        url: "/user",
        data: { ...data, username: userDetails.username },
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...userDetails, user: { ...userDetails.user, ...req.data } },
      });

      toast({
        title: "Alterado com sucesso!",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Houve um erro!",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box backgroundColor="gray.100" m={0} p={0}>
        <Box
          backgroundColor="brownish.200"
          width="100%"
          color="brand.300"
          p={2}
        ></Box>
        <Box m={0}>
          <Text
            color="bluish.100"
            fontSize="3rem"
            textAlign="center"
            fontWeight={500}
            p={10}
          >
            MEU PERFIL
          </Text>
        </Box>

        <Box m={20} mt={0} pb={10} color="bluish.100">
          <Text color="bluish.100" fontSize="1.8rem" textAlign="left" pb={5}>
            Informações básicas da conta
          </Text>
          <HStack spacing={10} margin={{ lg: "initial" }} pt={2}>
            <FormControl
              id="name"
              fontSize={isMobile ? "1rem" : "2rem"}
              isRequired
            >
              <FormLabel>Nome</FormLabel>
              <InputText
                name="name"
                control={control}
                error={errors.name}
                background="white"
              />
            </FormControl>
            <FormControl
              id="username"
              fontSize={isMobile ? "1rem" : "2rem"}
              isRequired
            >
              <FormLabel>Email</FormLabel>
              <InputText
                name="username"
                control={control}
                error={errors.username}
                background="white"
                isDisabled
              />
            </FormControl>
            <FormControl
              isRequired
              id="password"
              fontSize={isMobile ? "1rem" : "2rem"}
            >
              <FormLabel>Senha</FormLabel>
              <InputPassword
                register={{
                  ...register("password", {
                    required: "Campo obrigatório",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  }),
                }}
                error={errors.password}
                placeholder="*********"
                background="white"
              />
            </FormControl>
          </HStack>
          <Divider borderBottom="1px solid #034074" pt={10} mb={10} />
          <Text color="bluish.100" fontSize="1.8rem" textAlign="left" pb={5}>
            Endereço
          </Text>
          <HStack spacing={10} margin={{ lg: "initial" }} pt={2} pb={5}>
            <FormControl
              isRequired
              id="cep"
              fontSize={isMobile ? "1rem" : "2rem"}
            >
              <FormLabel>CEP</FormLabel>
              <InputText
                name="address.cep"
                control={control}
                error={errors.cep}
                placeholder="90420041"
                background="white"
              />
            </FormControl>
            <FormControl
              isRequired
              id="city"
              fontSize={isMobile ? "1rem" : "2rem"}
            >
              <FormLabel>Cidade</FormLabel>
              <InputText
                name="address.city"
                control={control}
                error={errors.city}
                placeholder="Porto alegre"
                background="white"
              />
            </FormControl>
            <FormControl
              isRequired
              id="state"
              fontSize={isMobile ? "1rem" : "2rem"}
            >
              <FormLabel>Estado</FormLabel>
              <InputText
                name="address.state"
                control={control}
                error={errors.state}
                placeholder="Rio Grande do Sul"
                background="white"
              />
            </FormControl>
          </HStack>
          <HStack spacing={10} margin={{ lg: "initial" }} pt={2} pb={5}>
            <FormControl id="logradouro" fontSize={isMobile ? "1rem" : "2rem"}>
              <FormLabel>Logradouro</FormLabel>
              <InputText
                name="address.street"
                control={control}
                error={errors.street}
                placeholder="Jardim Guaíra"
                background="white"
              />
            </FormControl>
            <FormControl id="number" fontSize={isMobile ? "1rem" : "2rem"}>
              <FormLabel>Número</FormLabel>
              <InputText
                name="address.number"
                control={control}
                error={errors.number}
                placeholder="1373"
                background="white"
              />
            </FormControl>
            <FormControl id="complemento" fontSize={isMobile ? "1rem" : "2rem"}>
              <FormLabel>Complemento</FormLabel>{" "}
              <InputText
                name="address.complement"
                control={control}
                error={errors.complement}
                placeholder="apto xxx"
                background="white"
              />
            </FormControl>
          </HStack>
          <Divider borderBottom="1px solid #034074" pt={10} mb={10} />
          <Text color="bluish.100" fontSize="1.8rem" textAlign="left" pb={5}>
            Informações complementares
          </Text>
          <HStack spacing={10} margin={{ lg: "initial" }} pt={2}>
            <FormControl
              isRequired
              id="cpf"
              fontSize={isMobile ? "1rem" : "2rem"}
            >
              <FormLabel>CPF</FormLabel>
              <InputCPF name="cpf" control={control} error={errors.cpf} />
            </FormControl>

            <FormControl
              isRequired
              id="phone"
              fontSize={isMobile ? "1rem" : "2rem"}
            >
              <FormLabel>Telefone</FormLabel>
              <InputPhone
                name="telephone"
                control={control}
                error={errors.phone}
              />
            </FormControl>
          </HStack>
        </Box>
        <Center pb={10}>
          <Button
            colorScheme="blue"
            background="bluish.100"
            color="white"
            type="submit"
          >
            Salvar alterações
          </Button>
        </Center>
        <Box
          backgroundColor="brownish.200"
          width="100%"
          color="brand.300"
          p={2}
        ></Box>
      </Box>
    </form>
  );
};

export default UserProfile;
