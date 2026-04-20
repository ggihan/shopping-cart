const Logo = ({ className, textColor = "#232f3e", arrowColor = "#ff9900", strokeWidth = 7 }) => {
  return (
    <svg className={className} viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
      <text 
        x="20" 
        y="70" 
        fontFamily="Arial, sans-serif" 
        fontWeight="bold" 
        fontSize="55" 
        fill={textColor}
      >
        emazon
      </text>
      
      <path 
        d="M47,75 C55,105 120,105 140,82" 
        stroke={arrowColor} 
        strokeWidth={strokeWidth} 
        fill="none" 
        strokeLinecap="round" 
      />
      
      <path d="M130,75 L150,72 L142,92 Z" fill={arrowColor} />
    </svg>
  );
};

export default Logo;