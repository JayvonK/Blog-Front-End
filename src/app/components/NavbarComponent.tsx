
'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';

export default function NavBarComponent() {
  return (
    <Navbar fluid rounded>
      <Navbar.Collapse>
        {/* We dont need to "To={}" we can just supplement with href */}
        <Navbar.Link as={Link} href="/">Login Page</Navbar.Link>
        <Navbar.Link as={Link} href="/BlogPage">Blog Page</Navbar.Link>
        <Navbar.Link as={Link} href="/Dashboard">DashBoard</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
