import React from"react";
import type{Metadata}from"next";
import{Inter}from"next/font/google";
import{ClerkProvider}from"@clerk/nextjs";
import{dark}from"@clerk/themes";
import"../globals.css";
import LeftSidebar from"@/components/shared/LeftSidebar";
import Bottombar from"@/components/shared/Bottombar";
import RightSidebar from"@/components/shared/RightSidebar";
import Topbar from"@/components/shared/Topbar";
import{Analytics}from'@vercel/analytics/react';import{SpeedInsights}from"@vercel/speed-insights/next"
const inter=Inter({subsets:["latin"]});
export const metadata:Metadata={
title:"ЭкоЭл journal",
description:"ЭкоЭл journal — укромный уголок учеников прекрасной школы ЭкоЭл",};
export default function RootLayout({children,}:{children:React.ReactNode;}){
return(<><link rel="icon"href="../logo.png"sizes="32x32"/><SpeedInsights/><Analytics/><ClerkProvider appearance={{ baseTheme: dark, }}>
<html lang='en'>
<body className={inter.className}>
<Topbar/>
<main className='flex flex-row'>
<LeftSidebar />
<section className='main-container'>
<div className='w-full max-w-4xl'>{children}</div></section>
{/* @ts-ignore */}
<RightSidebar />
</main>
<Bottombar />
</body></html></ClerkProvider></>);}