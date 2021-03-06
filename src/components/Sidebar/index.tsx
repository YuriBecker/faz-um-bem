import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { logout, useAuthDispatch, useAuthState } from "../../context";
import Logo from "../Logo";
import DefaultButton from "../DefaultButton";
import { FaUser } from "react-icons/fa";
interface Props {
  onClose: () => void;
  isOpen: boolean;
  variant: "drawer" | "sidebar";
}

const SidebarContent = () => {
  const dispatch = useAuthDispatch();

  const userDetails = useAuthState();
  const isSuperUser = userDetails?.user?.group === "Curator";

  return (
    <VStack color="brand.300">
      {!isSuperUser && (
        <DefaultButton
          title="Minha instituição"
          type="sidebar"
          route={"/instituição/" + userDetails?.user?.idUser}
          icon={<FaUser fontSize="12px" />}
        />
      )}

      <DefaultButton title="Campanhas" type="sidebar" route="/campanhas" />

      {!isSuperUser && (
        <DefaultButton
          title="Nova Campanha"
          type="sidebar"
          route="/nova-campanha"
        />
      )}
      {isSuperUser && (
        <DefaultButton
          title="Instituições"
          type="sidebar"
          route="/instituições"
        />
      )}
      {isSuperUser && (
        <DefaultButton
          title="Nova Instituição"
          type="sidebar"
          route="/nova-instituição"
        />
      )}
      <Divider borderBottom="1px solid #034074" pt={2} mb={10} />
      <Button
        color="#ED6A5A"
        leftIcon={<FaSignOutAlt />}
        onClick={() => logout(dispatch)}
        w="100%"
        variant="ghost"
        fontSize="18px"
      >
        Sair
      </Button>
    </VStack>
  );
};

const Sidebar = ({ isOpen, variant, onClose }: Props) => {
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      boxShadow="0px 8px 10px rgba(0, 0, 0, 0.1)"
      background="white"
    >
      <Logo height="150px" mb={5} />
      <SidebarContent />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
