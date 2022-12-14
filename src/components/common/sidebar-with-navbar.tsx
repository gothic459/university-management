import React, {ReactNode, ReactText} from 'react';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {FiBell, FiChevronDown, FiMenu,} from 'react-icons/fi';
import {IconType} from 'react-icons';
import {useUserStore} from "../../../store";
import {Link as RouterLink} from "react-router-dom";
import {routes} from "../../constants/routes";

export default function SidebarWithNavbar({children,}: { children: ReactNode; }) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Box
            minH="100vh"
            bg={useColorModeValue('gray.100', 'gray.900')}

        >
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4" pt="24">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    const user = useUserStore(state => state.user);
    return (
        <Box
            zIndex={20}
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {routes.map((route) => {

                const roleBasedPath = `/${user.role}${route.path}`;
                //@ts-ignore
                if (route.permission.includes('*') || route.permission.includes(user.role!)) {
                    if (route.subRoutes) {

                        return (
                            <Accordion
                                allowToggle
                                p="2"
                                mx="2.5"
                                role="group"
                                cursor="pointer"
                                key={route.name}
                            >
                                <AccordionItem border={'none'}
                                >
                                    <AccordionButton
                                        _hover={{
                                            bg: 'cyan.800',
                                            color: 'white',
                                        }}
                                        borderRadius={'lg'}
                                        p={2}
                                        m={0}
                                        display={'flex'}
                                        gap={4}
                                    >
                                        {route.icon && (
                                            <Icon
                                                as={route.icon}
                                            />
                                        )}
                                        <Box>
                                            {route.name}
                                        </Box>
                                        <AccordionIcon/>
                                    </AccordionButton>
                                    <AccordionPanel w="full">
                                        {route.subRoutes.map((subRoute) => {
                                            const subRoleBasedPath = `/${user.role}${subRoute.path}`;
                                            return (
                                                <NavItem mx={0} icon={subRoute.icon} to={subRoleBasedPath}
                                                         key={subRoute.name}>
                                                    {subRoute.name}
                                                </NavItem>
                                            )
                                        })}

                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        )


                    } else {
                        return (
                            <NavItem icon={route.icon} key={route.name}
                                //@ts-ignore
                                     to={route.permission.includes('*') ? route.path : roleBasedPath}>
                                {route.name}
                            </NavItem>
                        );
                    }

                }

            })}

        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    to: string;
}

const NavItem = ({icon, children, to, ...rest}: NavItemProps) => {
    return (
        <Link as={RouterLink} to={to} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="2"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.800',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({onOpen, ...rest}: MobileProps) => {

    const user = useUserStore(state => state.user);
    let hasAvatar = false;

    if (user.account.account_images) {
        hasAvatar = user.account.account_images.avatar_url !== null;
    }
    return (
        <Flex
            pl={{base: 0, md: 60}}
            px={{base: 4, md: 4}}

            alignItems="center"
            pos="fixed"
            width={'100%'}
            height={20}
            zIndex={10}
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell/>}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={hasAvatar ? user.account.account_images.avatar_url : ''}
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">

                                    <Text fontSize="sm">{user.first_name} {user.last_name}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {user.role}
                                    </Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.700')}
                            borderColor={useColorModeValue('white', 'gray.700')}>
                            <Link as={RouterLink} to={'/profile'}><MenuItem>Profile & Settings</MenuItem></Link>
                            {/*<Link as={RouterLink} to={'/settings'}><MenuItem>Settings</MenuItem></Link>*/}
                            <MenuDivider
                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                            />
                            <Link as={RouterLink} to={'/logout'}><MenuItem>Sign Out</MenuItem></Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};