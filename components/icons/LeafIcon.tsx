
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const LeafIcon: React.FC<IconProps> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M11 20A7 7 0 0 1 4 13V8a2 2 0 0 1 2-2h4l2 4l-3 3l3 3l-3 3" />
        <path d="M12 18a7 7 0 0 0 7-7v-1a2 2 0 0 0-2-2h-2" />
    </svg>
);
