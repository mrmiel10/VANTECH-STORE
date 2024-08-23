/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     missingSuspenseWithCSRBailout: false,
    //   },
      images: {
        // domains : ["firebasestorage.googleapis.com"],
        
        remotePatterns:[
            {
                hostname: "a0.muscache.com",
                protocol:"https",
                port: "",
            },
            {
                hostname: "firebasestorage.googleapis.com",
                protocol:"https",
                port: "",
            },
            {
                protocol:'https',
                hostname:'lh3.googleusercontent.com',
                port:"",
                pathname:"/a/**",
            },
            {
                protocol:"https",
                hostname:"avatars.githubusercontent.com",
                port:"",
                pathname:'/u/**',
            },
            {
                protocol:"https",
                hostname:"zijurhjioctaksze.public.blob.vercel-storage.com",
                port:"",
                //pathname:'/u/**',
            },
            {
                protocol:"https",
                hostname:"lzdzy7eapvafpa4c.public.blob.vercel-storage.com",
                port:"",
               // pathname:'/u/**',
            },
            {
                protocol:"https",
                hostname:"9bw0ivzad2pxo2te.public.blob.vercel-storage.com",
                port:"",
               // pathname:'/u/**',
            },
            {
                protocol:"https",
                hostname:"storyset.com/illustration/profile-interface/rafiki",
                port:"",
               // pathname:'/u/**',
            },
            {
                protocol:"https",
                hostname:"files.edgestore.dev",
                port:"",
               // pathname:'/u/**',
            },
        ]
    }
    
};

export default nextConfig;
