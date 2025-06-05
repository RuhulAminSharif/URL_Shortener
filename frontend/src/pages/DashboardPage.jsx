import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@tanstack/react-router";
import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";
import { getAllUserUrls, getCurrentUser } from "../api/user.api";
import { useQuery } from "@tanstack/react-query";
import AnalyticsChart from "../components/AnalyticsChart";

const DashboardPage = () => {
  const {
    data: userInfo,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 0,
  });

  console.log(userInfo.data);
  const fullName = userInfo.data.name;
  const userEmail = userInfo.data.email;
  const avatar = userInfo.data.avatar;

  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("urls");

  // Fetch user URLs for statistics
  const {
    data: urlsData,
    isLoading: isUrlsLoading,
    isError: isUrlsError,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to keep stats current
    staleTime: 0, // Consider data stale immediately so it refetches when needed
  });

  if ((isUserLoading || isUrlsLoading) && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  if(isUserError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading user information
      </div>
    );
  }
  if (isUrlsError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs
      </div>
    );
  }

  // Calculate statistics
  const totalUrls = urlsData?.urls?.length || 0;
  const totalClicks =
    urlsData?.urls?.reduce((sum, url) => sum + url.clicks, 0) || 0;
  
  // console.log(totalUrls, totalClicks);
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Link to="/" className="text-white text-2xl font-bold">
                  URL Shortener
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="User Avatar"
                      className="w-5 h-5 rounded-full mr-2"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-white/70 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}

                  <span className="text-white font-medium">{`${fullName}`}</span>
                </div>

                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* User Profile Section */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {fullName?.charAt(0) || "U"}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">
                        {fullName || "User"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {userEmail || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveTab("urls")}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                          activeTab === "urls"
                            ? "bg-purple-50 text-purple-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          ></path>
                        </svg>
                        My URLs
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("analytics")}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                          activeTab === "analytics"
                            ? "bg-purple-50 text-purple-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          ></path>
                        </svg>
                        Analytics
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                          activeTab === "settings"
                            ? "bg-purple-50 text-purple-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        Settings
                      </button>
                    </li>
                  </ul>
                </nav>

                {/* Stats */}
                {/* <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-4">
                    Statistics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-purple-600">
                        {totalUrls}
                      </div>
                      <div className="text-xs text-gray-500">Total URLs</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-indigo-600">
                        {totalClicks}
                      </div>
                      <div className="text-xs text-gray-500">Total Clicks</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === "urls" && (
                <div className="space-y-6">
                  {/* URL Creation Card */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Create New Short URL
                      </h2>
                      <UrlForm />
                    </div>
                  </div>

                  {/* URLs List Card */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                          My URLs
                        </h2>
                        <div className="flex space-x-2">
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors duration-200">
                            <svg
                              className="w-4 h-4 inline-block mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                              ></path>
                            </svg>
                            Filter
                          </button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors duration-200">
                            <svg
                              className="w-4 h-4 inline-block mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                              ></path>
                            </svg>
                            Sort
                          </button>
                        </div>
                      </div>
                      <UserUrl />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                      Analytics Dashboard
                    </h2>

                    {/* Analytics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                        <div className="flex items-center">
                          <div className="bg-blue-500/10 p-3 rounded-lg">
                            <svg
                              className="w-8 h-8 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {isUrlsLoading ? (
                                <span className="inline-block w-12 h-6 bg-blue-100 animate-pulse rounded"></span>
                              ) : (
                                totalClicks || 0
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">Total Views</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                        <div className="flex items-center">
                          <div className="bg-purple-500/10 p-3 rounded-lg">
                            <svg
                              className="w-8 h-8 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                          </div>
                          <div className="ml-6">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {isUrlsLoading ? (
                                <span className="inline-block w-12 h-6 bg-purple-100 animate-pulse rounded"></span>
                              ) : (
                                totalUrls || 0
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">Total URLs</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analytics Chart */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Views Over Time
                      </h3>
                      <AnalyticsChart />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashboardPage;
