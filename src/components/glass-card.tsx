"use client";

import React from "react";
import { createStyles } from "antd-style";
import { motion, HTMLMotionProps } from "framer-motion";

const useStyles = createStyles(({ token, isDarkMode, css }) => ({
    glassCard: css`
    background: ${isDarkMode ? "rgba(28, 28, 30, 0.6)" : "rgba(255, 255, 255, 0.7)"};
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 20px;
    border: 1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.4)"};
    box-shadow: 0 4px 24px -1px rgba(0,0,0,0.05);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    &:hover {
      background: ${isDarkMode ? "rgba(28, 28, 30, 0.8)" : "rgba(255, 255, 255, 0.85)"};
      box-shadow: 0 8px 32px -4px rgba(0,0,0,0.1);
      border-color: ${token.colorPrimaryBorder};
    }
  `,
}));

export interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    hoverable?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, style, hoverable = false, ...props }) => {
    const { styles, cx } = useStyles();

    return (
        <motion.div
            className={cx(styles.glassCard, className)}
            style={style}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
