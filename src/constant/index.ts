import { page1, page2, page3, page4, page5 } from "../assets";

 const Section = [
    {
        title: "Top Songs",
        image: page1,
        style: "page1",
        active: "music"
    },
    {
        title: "New Videos",
        image: page2,
        style: "page2",
        active: "video"
    },
    {
        title: "Fresh Podcast",
        image: page3,
        style: "page3",
        active: "podcast"
    },
    {
        title: "Live Event",
        image: page4,
        style: "page4",
        active: "event"
    },
    {
        title: "Virtual Town",
        image: page5,
        style: "page5",
        active: "virtual"
    }
]

const Tabs = [
    {
        name: "Songs",
        active: "music"
    },
    {
        name: "Podcast",
        active: "podcast"
    },
    {
        name: "Videos",
        active: "videos"
    },
    {
        name: "Live events",
        active: "event"
    },
    {
        name: "Virtual town",
        active: "virtual"
    },
]

export {
    Tabs,
    Section
}