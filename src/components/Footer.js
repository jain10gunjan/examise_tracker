import React from "react";

const Footer = () => {
  return (
    <footer class="bg-white dark:bg-gray-800 w-full py-8">
      <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-between">
        <p class="text-gray-500 text-sm text-center sm:text-left">
          © 2024 Examise.in
        </p>
        <p class="flex sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
          Practice MCQs For Free.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
