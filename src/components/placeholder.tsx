import { LucideMessageSquareWarning } from 'lucide-react';
import React, { cloneElement } from 'react';

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};

const Placeholder = ({
  label, 
  icon= <LucideMessageSquareWarning />, 
  button = <div />
}: PlaceholderProps) => {
  return (
    <div className='flex flex-col flex-1 items-center self-center justify-center gap-y-2'>
      {cloneElement(icon, {
        className: 'w-16 h-16'
      })}
      <h2 className='text-lg text-center'>{label}</h2>
      {cloneElement(button, {
        className: 'h-10'
      })}
    </div>
  );
};

export {Placeholder};