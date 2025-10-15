export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-about-heading">
            About Me
          </h2>
        </div>
        
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm a recent graduate with a strong foundation in{" "}
            <span className="text-foreground font-medium">computer science</span>,{" "}
            <span className="text-foreground font-medium">data science</span>, and{" "}
            <span className="text-foreground font-medium">applied mathematics</span>.
          </p>
          
          <p>
            My experience spans building automation pipelines for public transit systems,
            developing real-time 3D visualizations, and creating comprehensive analytics
            dashboards. I'm passionate about leveraging technology to solve complex problems
            and transform data into actionable insights.
          </p>
          
          <p>
            I have hands-on experience with a diverse technology stack including Python,
            SQL, various visualization tools, and modern web frameworks. Whether it's
            automating workflows, building interactive applications, or analyzing complex
            datasets, I bring a practical, solution-oriented approach to every project.
          </p>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6 text-center">Core Competencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-card border border-card-border">
              <h4 className="font-semibold mb-2">Data Engineering</h4>
              <p className="text-sm text-muted-foreground">
                ETL pipelines, API integration, data validation
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-card-border">
              <h4 className="font-semibold mb-2">Visualization</h4>
              <p className="text-sm text-muted-foreground">
                3D rendering, real-time dashboards, interactive displays
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-card-border">
              <h4 className="font-semibold mb-2">Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Machine learning, statistical analysis, reporting
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
