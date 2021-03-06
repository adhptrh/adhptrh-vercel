// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      name: "home", type: "folder", content: [
      ]
    },
    {
      name: "desktop", type: "folder", content: [
        { name: "File Manager", type: "filemanager", id: 1, closeState: false },
        {
          name: "welcome",
          type: "file",
          ext: "txt",
          content:
            `hello there,\n` +
            `my name is Adhika and welcome to my website\n\n` +
            `Tips:\n` +
            `- To open folder or file, double click it.\n` +
            `- You can resize the window by dragging right bottom edge of the window.\n` +
            `- Right click the wallpaper to show context menu.\n` +
            ``, 
          id: 2, closeState: false
        },
        {
          name: "aboutme",
          type: "file",
          ext: "txt",
          content:
            `Hello my full name is Adhika Putra Hermanda,\n` +
            `I was born on 28th August 2003 at a city called Pekanbaru in Indonesia.\n\n` +
            `Programming language that i ever used:\n` +
            `Javascript/Typescript, Go, PHP, Python, Lua, C#, C++\n\n` +
            `Technologies that i ever used:\n` +
            `Laravel, NextJS, ReactJS, VueJS, Svelte, CodeIgniter, Docker, Git,\n\n` +
            `I started programming at the age of 13, that time i created my own tools for game hacking\n` +
            `To be continued...\n` +
            ``, 
          id: 3, closeState: false
        },
        {
          name: "Terminal",
          type: "terminal",
          ext: "exe",
          id: 4, closeState: false
        },
      ]
    },
    {
      name: "documents", type: "folder", content: [
        { name: "hello", type: "file", ext: "txt", content: "hello" },
        { name: "lmao", type: "file", ext: "txt", content: "what are u lookin at" },
        { name: "important", type: "folder", content: [] },
      ]
    },
    {
      name: "gallery", type: "folder", content: [
      ]
    },
  ])
}
