import clsx from 'clsx';
import { LinkButton } from './link-button';
import React, { useState } from 'react';
import { routes } from '../../../constants/routes';

export const Sidebar = ():JSX.Element =>{

  const [selected, setSelected] = useState<string>('');

  return(
    <nav className={clsx('dark-boxshadow flex flex-col gap-y-5 text-base overflow-auto bg-gray-medium h-full w-72 absolute p-4 scrollbar scrollbar-thumb-blue-light/10 scrollbar-thin',)}>
      <div className={'h-1/6 flex bg-black'}>
        logo
        ---
      </div>
      <div className={'h-full flex flex-col gap-y-1'}>
        {routes.map((route) => (
          <LinkButton
            key={route.name}
            url={route.path}
            title={route.name}
            notif
            onClick={() => setSelected(route.name)}
            selected={selected === route.name}
          />
        ))}
      </div>
    </nav>
  )
}