import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 py-20">
        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-wide bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Luxvia
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Where timeless elegance meets modern innovation. Luxvia is more than
          a store — it’s a luxury lifestyle.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-6 md:px-20 py-16">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold text-[#D4AF37]">Our Mission</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            At Luxvia, we believe luxury is more than aesthetics — it’s an
            experience. Our mission is to provide customers with world-class
            quality, elegance, and exclusivity in every product.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="https://www.pixel4k.com/wp-content/uploads/2018/10/sneakers-stylish-sports-bw-4k_1540061049.jpg"
            alt="Luxury Lifestyle"
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="px-6 md:px-20 py-16">
        <h2 className="text-4xl font-semibold text-center text-[#D4AF37] mb-12">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Elegance",
              desc: "Every product is curated to reflect timeless beauty and grace.",
            },
            {
              title: "Innovation",
              desc: "Blending modern technology with traditional craftsmanship.",
            },
            {
              title: "Trust",
              desc: "Your satisfaction and confidence drive our journey.",
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              className="p-8 rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition duration-500 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {value.title}
              </h3>
              <p className="text-gray-400">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Section */}
      <section className="text-center px-6 py-20 border-t border-neutral-800">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#D4AF37]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Redefining Luxury, One Experience at a Time
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl mx-auto text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Discover a new way to shop where elegance, innovation, and trust come
          together. Welcome to Luxvia.
        </motion.p>
      </section>
    </div>
  );
}
