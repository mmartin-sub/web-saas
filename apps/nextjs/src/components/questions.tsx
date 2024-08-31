import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@saasfly/ui/accordion";

export function Questions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>About Substantifik</AccordionTrigger>
        <AccordionContent className="whitespace-pre-wrap">
          {`We are excited to unveil our AI product, a reflection of our team's extensive expertise, which includes business leaders with an average of twenty years dedicated to perfecting their skills across key sectors such as Sales, Finance, Operations, and IT. Our shared experiences have not only sharpened our technical abilities but also enriched our understanding of complex business ecosystems and their associated challenges.

Our path has been defined by a steadfast commitment to excellence, leading to the development of our AI platform. This platform is a confluence of industry best practices and established methodologies, refined through numerous successful initiatives. It is more than a mere collection of tools; it is the cornerstone of our operations, a dynamic force driving us to achieve exceptional results for our clients. The solutions we offer have been meticulously developed to address common industry challenges and are flexible enough to accommodate a wide range of business contexts.

We believe it will provide you with a strong and adaptable foundation for your AI endeavors. Crafted to optimize your processes, boost productivity, and aid in the fulfillment of your project goals, our dedication to your success is steadfast. We eagerly anticipate building a partnership centered on shared innovation, excellence, and collective advancement.
`}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Why is it good for me?</AccordionTrigger>
        <AccordionContent className="whitespace-pre-wrap">
This AI solution is a game-changer for your enterprise because it seamlessly bridges the gaps between different departments, fostering better collaboration and communication. By integrating human best practices, it ensures that the answers provided are of the highest quality, which can significantly enhance decision-making and efficiency. Moreover, the continuous support and expert guidance it offers empower your employees, making them feel more confident and capable in their roles. This leads to a more cohesive and productive team, ultimately driving your business forward with greater innovation and success.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
