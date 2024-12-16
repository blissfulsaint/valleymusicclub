import { Metadata } from "next";
import Hero from "./ui/components/Hero/Hero";

export const metadata: Metadata = {
  title: 'Home | Valley Music Club',
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-screen-sm">
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Senectus pulvinar gravida porta facilisis natoque elementum sociosqu eu. Molestie cursus accumsan vitae hendrerit; hendrerit montes et eleifend eros. Elit phasellus metus vehicula; massa lacus congue sagittis. Etiam proin iaculis tortor ligula pulvinar ornare vehicula. Ante nam fermentum turpis ac nibh, blandit parturient senectus.

          Aenean sodales netus faucibus ornare viverra dolor semper suspendisse. Fusce rutrum enim litora metus porttitor venenatis fermentum. Velit class dictum taciti a ornare. Dapibus phasellus cubilia pulvinar pharetra pharetra. Erat convallis netus nascetur hendrerit est rhoncus imperdiet nisl. Vitae nisl dui suscipit dui eu id. Aliquam egestas ornare quam turpis torquent ullamcorper; nec ligula. Risus volutpat eu venenatis hendrerit pellentesque ornare massa.

          Volutpat eleifend urna senectus sapien tempus facilisis magnis tempus duis. Commodo ante himenaeos nam lacus mauris dis. Pharetra quisque netus parturient sapien molestie. Sem mus sed etiam sollicitudin mi blandit mauris bibendum. Hendrerit neque laoreet dictum hac metus per volutpat iaculis. Leo pharetra amet ultricies eleifend sollicitudin sit? Nisi posuere arcu facilisis felis proin vehicula mauris. Vel nisi finibus maximus ornare interdum ante. Habitasse ante turpis viverra sed elementum aliquet.

          Integer morbi tellus erat est fusce amet hendrerit tristique. Fringilla vel hendrerit vitae neque pellentesque lectus. Senectus magna blandit, rhoncus senectus fermentum faucibus nibh. Donec cubilia vitae eu lacus blandit orci nascetur augue dictum. Mattis quisque magnis fringilla, platea class cursus. Luctus metus ridiculus eu hendrerit litora mi elementum. Penatibus orci dis laoreet mi lorem sociosqu nisi. Euismod nulla porta volutpat condimentum torquent leo aliquam tortor gravida. Integer augue dapibus pretium nisl est gravida duis nisi.

          Accumsan vivamus sociosqu aenean class mus tincidunt est penatibus sit. Nibh felis quam felis sagittis scelerisque? Nisi augue quam vestibulum enim gravida nisl maecenas lacinia. Id taciti sociosqu nascetur libero fusce nibh. Cras erat montes lobortis curabitur taciti, in primis efficitur. Curae condimentum mollis, lectus sem parturient in eget. Tristique himenaeos duis taciti feugiat suscipit; duis lacus mauris.
        </p>
      </div>
    </>
  );
}
