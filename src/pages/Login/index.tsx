import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosService';

interface FormDataType {
  name: string;
  email: string;
}

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

const Login = () => {
  const [formData, setFormData] = useState<FormDataType>({name: "", email: ""});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/login`, formData, { withCredentials: true });
      if (response.status === 200 && response.data == "OK") {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <svg
            className="my-auto"
            width={210}
            height={45}
            viewBox="0 0 256 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.717 59.022H10.172C4.586 59.022.025 54.436.025 48.82V11.068C.025 5.452 4.586.866 10.172.866h37.545c5.586 0 10.147 4.586 10.147 10.202V48.82c0 5.616-4.596 10.202-10.147 10.202z"
              fill="#300D38"
            />
            <path
              d="M50.44 33.143c-.106-1.6-.848-3.519-5.232-2.275-2.263.64-4.313.676-5.233-.213-.106-.142-.212-.285-.282-.427-.354-.675-.177-1.742.671-3.163.601-1.031 1.308-1.28 2.121-1.28.708 0 1.485.142 2.475.142 3.04-.071 4.207-1.99 4.066-3.732-.036-.534-.743-.356-2.05-.676-1.309-.32-2.37-.142-2.652-2.026-.07-.533-.778-1.706-2.369-1.955-1.06-.178-3.323-1.244-5.02.107l-1.485-.64c-.99-.25-.92.426-1.838.782-.849.284-2.475-.498-2.016.604.354.889 1.804 2.062 3.571 1.493-1.06 5.297-6.116 6.505-10.323 6.328-5.621-.214-9.97-4.977-9.758-10.594.071-1.635-.46-2.097-.99-1.244-.14.249-.318.64-.424 1.138-.035.177-.106.355-.141.533-.46 2.346.106 7.038 3.995 10.095 0 0-1.308 1.067-1.732 3.058a6.87 6.87 0 00-.071 2.523c.035.214.07.356.07.356.354 1.742-2.863 2.915-4.277 3.164-.106 0-.212.035-.318.035h-.566a3.15 3.15 0 01-.636-.071c-.849-.071-1.45.071-2.016 2.168-.777 2.986-3.005 2.311-3.535 3.164-.848 1.351.424 2.346 2.015 2.453.955.035 2.05-.213 2.864-.96 2.757-2.488 1.45-3.626 4.171-3.412.354.035.778.07 1.273.142 3.04.39 5.197 1.03 8.167-2.204 0 0 .247-.391.6-.676a1.33 1.33 0 01.531-.32c.07-.07.46-.035.53-.035 1.167.284 3.748 1.706 6.682 1.209a8.442 8.442 0 003.076-1.956s.46-.426.778-.035c.389.426.778 1.173 1.237 1.67 1.06 1.138 1.06.676 3.288-.248.212-.107.46-.178.743-.285 5.798-2.132 5.656-2.808 6.823-.497.212.426.954.462 1.661.177.849-.39 1.627-1.208 1.556-2.417z"
              fill="#FBA919"
            />
            <path
              d="M32.373 34.21c-1.484 3.057-6.858 1.102-6.964.462.035-.462.389-1.493.035-1.138a86.793 86.793 0 00-1.874 2.24 1.33 1.33 0 01.53-.32c.071-.071.46-.036.53-.036 1.168.285 3.748 1.706 6.683 1.209a8.442 8.442 0 003.076-1.955s.46-.427.777-.036c0 0-1.237-2.062-1.732-2.915-.318-.462-.354 1.031-1.06 2.489zM39.551 24.754c-.495-.96-2.899-.284-1.803.533 2.864 2.098.035 2.169 1.945 4.977-.354-.675-.177-1.742.671-3.164.601-1.03 1.308-1.28 2.121-1.28 0-.035-2.439-.106-2.934-1.066z"
              fill="#414042"
              opacity={0.1}
            />
            <path
              d="M193.197 4.635h8.662v19.16c.495-.676.848-1.28 1.308-1.813 1.732-2.026 3.995-3.164 6.611-3.626 2.97-.533 5.904-.355 8.697.818 3.535 1.457 5.692 4.194 6.823 7.785.672 2.061.849 4.23.884 6.363 0 4.017 0 8.033.035 12.05 0 .569.107 1.173.248 1.742.247.924.848 1.387 1.803 1.422.53.036 1.061 0 1.662 0 0 .142.035.284.035.462v6.328c0 .213-.141.568-.283.568-2.899.57-5.763.747-8.449-.746-2.122-1.173-3.076-3.2-3.465-5.51a17.522 17.522 0 01-.248-3.057c-.035-4.088 0-8.176 0-12.264 0-1.493-.212-2.95-.813-4.337-1.202-2.737-3.924-4.301-7.035-4.052-4.455.355-7.566 3.519-7.636 8.034-.071 7.002-.036 14.04-.036 21.044v.853h-8.661c-.142-17.028-.142-34.09-.142-51.224zM128.677 31.971c-1.414-6.15-4.949-10.593-10.853-12.94-3.748-1.457-7.637-1.599-11.526-.746-6.045 1.316-10.5 4.728-12.974 10.487-2.05 4.728-2.228 9.669-.99 14.61 1.06 4.301 3.394 7.82 7.177 10.202 6.151 3.875 12.762 4.195 19.515 1.92 3.005-.996 5.48-2.95 7.707-5.297-1.768-1.742-3.5-3.448-5.197-5.048-1.132.853-2.157 1.813-3.359 2.489-3.288 1.955-6.858 2.097-10.5 1.173-2.828-.711-4.985-2.346-6.293-5.012-.636-1.28-.99-2.667-1.025-4.23h28.672c.283-2.418.247-4.977-.354-7.608zm-8.485 1.422h-19.621c0-1.209.424-2.275 1.025-3.235 1.768-2.773 4.384-4.194 7.531-4.692 2.722-.427 5.267.071 7.53 1.635 2.051 1.422 3.323 3.342 3.5 5.901.035.107.035.213.035.391zM188.954 24.044c-.177.177-.283.32-.424.462-1.662 1.742-3.324 3.448-4.985 5.19-5.268-5.723-14-4.906-18.066-.143-3.712 4.373-3.535 11.838.53 16.068 4.101 4.301 12.374 4.799 17.5-.71l5.409 5.651c-2.863 3.093-6.257 5.19-10.358 5.972-6.152 1.173-11.879.142-16.97-3.697-4.419-3.341-6.894-7.856-7.459-13.401-.566-5.51.813-10.451 4.348-14.717 2.97-3.59 6.823-5.794 11.349-6.683 4.772-.924 9.404-.462 13.752 1.849 2.051 1.066 3.783 2.488 5.374 4.159zM151.127 48.713v7.892c-.778.107-1.556.249-2.369.32-2.439.178-4.879.142-7.212-.604-3.606-1.173-5.621-3.804-6.363-7.43-.319-1.6-.46-3.235-.46-4.87-.071-5.439-.035-10.877-.035-16.316v-.818h-4.561v-8.034h4.561V4.67h8.803v14.148h8.131v8.034h-8.061c0 .248-.035.39-.035.568 0 5.581 0 11.127.035 16.708 0 .64.106 1.28.248 1.92.424 1.812 1.697 2.843 3.57 2.914.637.036 1.238.036 1.874 0 .601-.07 1.202-.178 1.874-.249zM75.752 45.337c0 .568-.106 1.173-.247 1.741-.248.925-.849 1.387-1.803 1.422-.53.036-1.06 0-1.662 0 0 .143-.035.285-.035.462v6.328c0 .213.141.569.283.569 2.899.569 5.762.746 8.45-.747 2.12-1.173 3.075-3.199 3.464-5.51.177-.995.283-3.128.283-3.128V26.852h6.894v-8.034h-6.894c0-1.173-.071-2.275 0-3.341.247-3.093 1.59-4.337 4.666-4.337 1.167 0 2.298.106 3.5.178V3.924c-.106-.036-.176-.036-.247-.071-2.581-.356-5.162-.391-7.707.035-3.819.64-6.611 2.702-8.06 6.399-.743 1.884-.92 3.839-.92 5.865v2.702h-5.975v8.034h6.01v18.449z"
              fill="#300D38"
            />
          </svg>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData?.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;