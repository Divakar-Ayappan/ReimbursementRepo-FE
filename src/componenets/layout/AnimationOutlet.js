// components/layout/AnimatedOutlet.jsx
import { useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedOutlet({context}) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
            >
                <Outlet context={context}/>
            </motion.div>
        </AnimatePresence>
    );
}
