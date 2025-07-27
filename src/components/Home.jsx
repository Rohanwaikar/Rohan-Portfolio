import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(endpoints.home);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      }
    };

    fetchHomeData();
  }, []);

  if (!data) return <FallbackSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="flex items-center justify-center text-center px-4"
      style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '150px' }} // adjust if navbar is taller
    >
      <div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">{data.name}</h1>

        <div className="flex text-2xl mt-4 justify-center">
          <h2 className="mr-2">I&apos;m</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data.roles,
            }}
          />
        </div>

        <div className="mt-6">
          <Social />
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
