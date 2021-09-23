import Layout from "@/components/layout/Layout";
import { useTexts } from "@/lib/hooks";
import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";
import { LayoutThemes } from "@/lib/theming";

import cartImage from "@/public/media/cart.png";

export default function New() {
    const { t } = useTexts();

    return (
        <Layout
            picture={cartImage}
            t={t}
            theme={LayoutThemes.dirt}
            title="Привет!"
            subtitle={"Египтяне..."}
        >
            <h1>Dirt</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat, quam aspernatur. Laboriosam molestiae excepturi dicta
                temporibus dolorem, illum tenetur laudantium officia veniam.
                Praesentium obcaecati blanditiis similique architecto ex,
                eveniet laborum repudiandae deleniti incidunt harum tempora vel
                quae laboriosam ipsa perferendis repellat laudantium ut.
                Dignissimos, eveniet. Officiis impedit porro nobis velit dolore
                adipisci labore animi, in, assumenda ipsa perspiciatis? Nam
                alias saepe aspernatur doloremque impedit laudantium voluptate
                ipsa dolorum atque dolor, animi quasi enim repudiandae, tempora,
                sed obcaecati quae deserunt ex numquam et quod vitae debitis
                autem earum! Blanditiis illum quod possimus sit fugiat
                distinctio amet officia eveniet. Placeat exercitationem eveniet
                ipsa ad optio numquam ipsum nostrum quod tempore veritatis modi
                quia distinctio voluptas blanditiis amet ullam neque repellendus
                consequatur enim, minus eos. Est ipsa, suscipit non iste facere
                commodi provident! Perferendis optio ab, molestias architecto
                magni pariatur illo sit, fugiat accusamus dignissimos unde odio
                ipsam distinctio in, rerum iste fuga blanditiis eos. Dolorum
                laboriosam ex, repellendus dicta deleniti illum dolor amet,
                minima distinctio neque explicabo laborum et porro, molestiae
                incidunt expedita sunt. Consectetur illum in sequi illo ipsam
                sapiente inventore. Architecto aliquam sint culpa? Facere,
                debitis nulla, sed ex quo eius fuga necessitatibus assumenda
                iure recusandae reiciendis! Porro, eligendi autem?
            </p>

            <section>
                <h1>hi</h1>
                <p>111</p>
            </section>
        </Layout>
    );
}

export const getStaticProps = getStaticPropsOnlyTexts;
