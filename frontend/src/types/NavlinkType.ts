import type { NavLinkProps, ElementProps } from '@mantine/core';

interface MyNavLinkProps extends NavLinkProps,
  ElementProps<'button', keyof NavLinkProps> {}