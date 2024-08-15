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
        <AccordionContent>
          Substantifik’s team of experienced developers has invested years
          into refining our software development methodologies. We’re proud to
          present our starter kit, a culmination of best practices and proven
          tools extracted from countless successful projects. This extensively
          tested kit is more than just code, it’s a cornerstone of our daily
          operations, consistently helping us deliver exceptional results for
          our clients. While informed by our unique experiences, the kit’s
          solutions are meticulously chosen to address common challenges and fit
          a wide range of scenarios. We believe it offers a streamlined and
          efficient framework for building SaaS products, empowering you to
          achieve your project goals.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Why is it good for me?</AccordionTrigger>
        <AccordionContent>
        This AI solution is a game-changer for your enterprise because it seamlessly bridges the gaps between different departments, fostering better collaboration and communication. By integrating human best practices, it ensures that the answers provided are of the highest quality, which can significantly enhance decision-making and efficiency. Moreover, the continuous support and expert guidance it offers empower your employees, making them feel more confident and capable in their roles. This leads to a more cohesive and productive team, ultimately driving your business forward with greater innovation and success.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
