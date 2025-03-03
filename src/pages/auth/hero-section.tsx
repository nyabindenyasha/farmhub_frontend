import {motion} from "framer-motion"

function HeroSection() {
    return (
        <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative flex flex-col items-center justify-center h-full p-8 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200"
        >
            <div className="max-w-3xl text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Digital platform for distance learning.
                </h1>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Start off your study with everything that you will ever need.
                </p>
            </div>
        </motion.div>
    )
}

export default HeroSection