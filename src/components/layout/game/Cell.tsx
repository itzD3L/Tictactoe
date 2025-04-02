import { motion } from 'motion/react';

const variants = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
    }
}

type CellType = {
    className: string,
    delay: number,
    disabled: boolean,
    onSubmit: () => void
}

interface CellProps extends CellType {
    children : React.ReactNode;
}

const Cell = ({className, delay, disabled, onSubmit, children} : CellProps) => {
    return (
        <motion.button
            className={className}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                duration: 0.5,
                delay: delay
            }}
            disabled={disabled}
            onClick={onSubmit}
        >
            {children}
        </motion.button>
    )
}

export default Cell;