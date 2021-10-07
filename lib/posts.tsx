import {
    faCoffee,
    faInfo,
    faLink,
    faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface PostData {
    title: string;
    subtitle: string;
    tag: Tag;
    image: {
        data: StaticImageData | null;
        path: string;
        alt: string;
    };
}

const excludeDataFromTag = (line: string, tag: string) => {
    line = line.replace("</", "<");
    for (let i = 0; i < 2; i++) {
        line = line.replace(`<${tag}>`, "");
    }
    return line.trim();
};

const getPostData = async (
    postText: string,
    postObject: any
): Promise<PostData> => {
    const lines = postText.split("\n");
    let title = "-",
        subtitle = "-",
        image = { data: null, alt: "-", path: "" };
    for (const line of lines) {
        if (line.includes("title")) {
            title = excludeDataFromTag(line, "title");
            break;
        }
    }
    for (const line of lines) {
        if (line.includes("subtitle")) {
            subtitle = excludeDataFromTag(line, "subtitle");
            break;
        }
    }
    for (const line of lines) {
        if (line.includes("<pic ")) {
            const image_file_index = line.indexOf("image_file") + 12;
            const image_file_end = line.indexOf('"', image_file_index);

            image.path = line.substr(
                image_file_index,
                image_file_end - image_file_index
            );

            const image_alt_index = line.indexOf("alt") + 5;
            const image_alt_end = line.indexOf('"', image_alt_index);
            image.alt = line.substr(
                image_alt_index,
                image_alt_end - image_alt_index
            );
            break;
        }
    }

    return {
        title,
        subtitle,
        image,
        tag: postObject.tag,
    };
};

const getPostText = async (
    fs: any,
    post_id: string,
    locale: string | undefined
) => {
    locale ||= "ua";
    let content;
    try {
        content = await fs.readFile(
            process.cwd() + `/public/locales/${locale}/posts/${post_id}.md`,
            "utf8"
        );
    } catch (error: any) {
        content = null;
        console.log(`Probably ENONT ${error}`);
    }
    return content;
};

const getImage = (image_file: string) => {
    return require("@/public/media/" + image_file);
};

export type Tag = "link" | "about" | "location" | "";
const tagToIcon = {
    link: faLink,
    about: faInfo,
    location: faLocationArrow,
    "": faCoffee,
};

const getIconFromTag = (tag: Tag) => {
    const TagComponent = tagToIcon[tag];
    return <FontAwesomeIcon icon={TagComponent} size={"xs"} />;
};

export { getPostData, getPostText, getImage, getIconFromTag };
