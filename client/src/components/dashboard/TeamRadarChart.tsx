import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TeamAttribute {
  name: string;
  value: number;
}

interface TeamRadarChartProps {
  attributes: TeamAttribute[];
}

export default function TeamRadarChart({ attributes }: TeamRadarChartProps) {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current || !attributes.length) return;

    const svg = chartRef.current;
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Clear previous chart
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const width = svg.clientWidth || 300;
    const height = svg.clientHeight || 300;
    
    // Center of the chart
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    
    const numPoints = attributes.length;
    const angleSlice = (Math.PI * 2) / numPoints;
    
    // Draw axes
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleSlice;
      const lineX = centerX + radius * Math.cos(angle - Math.PI/2);
      const lineY = centerY + radius * Math.sin(angle - Math.PI/2);
      
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', centerX.toString());
      line.setAttribute('y1', centerY.toString());
      line.setAttribute('x2', lineX.toString());
      line.setAttribute('y2', lineY.toString());
      line.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
      
      // Add text labels
      const textX = centerX + (radius + 20) * Math.cos(angle - Math.PI/2);
      const textY = centerY + (radius + 20) * Math.sin(angle - Math.PI/2);
      
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', textX.toString());
      text.setAttribute('y', textY.toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('alignment-baseline', 'middle');
      text.setAttribute('fill', '#BDBDBD');
      text.setAttribute('font-size', '10');
      text.textContent = attributes[i].name;
      svg.appendChild(text);
    }
    
    // Draw circular levels
    for (let j = 1; j <= 4; j++) {
      const levelRadius = radius * (j / 4);
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', centerX.toString());
      circle.setAttribute('cy', centerY.toString());
      circle.setAttribute('r', levelRadius.toString());
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);
    }
    
    // Draw the radar chart for current data
    const points = attributes.map((attr, i) => {
      const angle = i * angleSlice;
      const pointRadius = radius * attr.value;
      return {
        x: centerX + pointRadius * Math.cos(angle - Math.PI/2),
        y: centerY + pointRadius * Math.sin(angle - Math.PI/2)
      };
    });
    
    // Create polygon path for the data
    const polygon = document.createElementNS(svgNS, 'polygon');
    const pointsString = points.map(point => `${point.x},${point.y}`).join(' ');
    polygon.setAttribute('points', pointsString);
    polygon.setAttribute('fill', 'rgba(94, 53, 177, 0.5)');
    polygon.setAttribute('stroke', '#5E35B1');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);
    
    // Add points at each data point
    points.forEach(point => {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', point.x.toString());
      circle.setAttribute('cy', point.y.toString());
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#39FF14');
      circle.setAttribute('stroke', '#39FF14');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);
    });
  }, [attributes]);

  return (
    <Card className="overflow-hidden shadow-lg bg-surface bg-opacity-50 border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white">Team Composition Analysis</h3>
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 4V9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 20V15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 20V15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 19.5C16.5 16.4624 14.0376 14 11 14C7.96243 14 5.5 16.4624 5.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Updated based on last match</span>
        </div>
        <div className="mt-4 h-64 relative">
          <svg ref={chartRef} width="100%" height="100%"></svg>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 rounded-md bg-darkBg">
            <div className="text-sm font-medium text-white">Strengths</div>
            <ul className="mt-2 ml-4 text-xs text-gray-400 list-disc">
              <li>Team fighting coordination</li>
              <li>Objective control</li>
              <li>Late game scaling</li>
            </ul>
          </div>
          <div className="p-3 rounded-md bg-darkBg">
            <div className="text-sm font-medium text-white">Weaknesses</div>
            <ul className="mt-2 ml-4 text-xs text-gray-400 list-disc">
              <li>Early game pressure</li>
              <li>Lane phase consistency</li>
              <li>Champion pool diversity</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
