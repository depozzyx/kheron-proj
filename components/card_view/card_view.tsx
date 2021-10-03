import styles from "./card_view.module.scss";
import Card from "./card";
import { getImage, PostData } from "@/lib/posts";

interface CardViewProps {
    t: (key: string) => string;
    posts: { [key: string]: PostData };
}

const CardView: React.FC<CardViewProps> = ({ t, posts }) => {
    console.log(posts);

    return (
        <section className={styles.card_view}>
            {posts &&
                Object.keys(posts).map((key) => (
                    <Card
                        key={key}
                        title={posts[key].title}
                        subtitle={posts[key].subtitle}
                        href={`/posts/${key}`}
                        tag={posts[key].tag}
                        image={posts[key].image}
                    />
                ))}

            <Card
                title={"Iсторичнi постатi в назвах вулиць Херсону"}
                subtitle={"наш iнший проект"}
                href={`https://kherson-proj.herokuapp.com/#/`}
                tag={"link"}
                image={{
                    alt: "Iсторичнi постатi в назвах вулиць Херсону",
                    data: getImage("kherson-proj-1.png"),
                }}
            />
        </section>
    );
};

export default CardView;
