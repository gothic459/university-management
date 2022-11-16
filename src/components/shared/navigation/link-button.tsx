import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Button } from '../button/button';

interface LinkProps{
  url: string;
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  notif?: boolean;
  childrenClassName?: string;
  hasCta?: boolean;
}
export const LinkButton = (props: LinkProps):JSX.Element =>{

  return (
    <Link href={props.url}>
      <a onClick={props.onClick}
         className={clsx('flex justify-between text-gray-light w-full p-2 hover:bg-gray-light/10 rounded-md',
           props.selected && 'bg-blue-light/20 text-blue-light',
           props.className)}>
        <div className={'flex w-full'}>
              <div className={'w-fit flex flex-col items-center justify-center'}>
                {props.icon}
                {props.title}
              </div>

              <div className={'w-full flex items-center justify-center'}>
                {props.children}
              </div>
            {
              props.hasCta && (
                <div className={'flex items-center'}>
                  <Button>Reply</Button>
                </div>
              )
            }
        </div>
        {
            props.notif &&(
            <div className={clsx('rounded-full bg-blue-light w-10 flex justify-center',)}>
              29
            </div>
          )
        }

      </a>
    </Link>
  );
}