'use client'

import { useState } from "react";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useRouter } from "next/navigation";


// By default next js components our server side (Server side components cannot have useStates in them)
// 'use client' turns the component into client component.

// The page.tsx inside of our app is our default home page.

// This will be our login page and our create account page

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [switchBool, setSwitchBool] = useState<boolean>(true);

  const router = useRouter();

  const handleSwitch = () => {
    setSwitchBool(!switchBool);
  }

  const handleSubmit = () => {
    // Putting our user data inside of an object so we can put it in our Post fetch
    let userDatea = {
      username: username,
      password: password
    }

    if(switchBool) {
      // Create account logic in here

    } else {
      // Login Logic in here
      router.push('/Dashboard')
    }
  }

  return (
    <div className="grid grid-flow-row justify-center mt-20">
      <div className="bg bg-slate-500 min-w-96 p-8 rounded-lg">
        <h1 className="text-3xl">{switchBool ? 'Create Account' : 'Login'}</h1>
      <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="username" />
        </div>
        <TextInput id="username" type="text" placeholder="enter username" required  onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleSwitch} color="light">{switchBool ? 'Already have an account?' : 'Sign up'}</Button>
      </div>
      <Button onClick={handleSubmit} type="submit">Submit</Button>
    </form>

      </div>
    </div>
  );
}
