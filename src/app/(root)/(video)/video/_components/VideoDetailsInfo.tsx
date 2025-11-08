"use client";

import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/Tabs";

export default function VideoDetailsInfo({
  description,
}: {
  description?: string;
}) {
  return (
    <Tabs defaultValue="description">
      <div className="flex border-b border-b-gray-200">
        <TabsTrigger
          label="Description"
          value="description"
          className="rounded-b-2 rounded-none bg-transparent"
          activeTriggerClassName="bg-transparent text-violet-500 border-b-2 border-b-violet-500"
        />

        <TabsTrigger
          label="Trasnscript"
          value="trasnscript"
          className="rounded-b-2 rounded-none bg-transparent"
          activeTriggerClassName="bg-transparent text-violet-500 border-b-2 border-b-violet-500"
        />
      </div>
      <div className="min-h-[300px] max-h-[300px] overflow-y-auto">
        <TabsContent contentKey="trasnscript" className="space-y-5">
          <div className="tracking[-.8px] space-x-0.5 text-xs font-medium">
            <span className="text-violet-500">[00:00]</span>
            <span className="text-gray-700">
              Hey team, quick update from today’s sprint planning meeting.
            </span>
          </div>

          <div className="tracking[-.8px] space-x-0.5 text-xs font-medium">
            <span className="text-violet-500">[00:00]</span>
            <span className="text-gray-700">
              Hey team, quick update from today’s sprint planning meeting.
            </span>
          </div>

          <div className="tracking[-.8px] space-x-0.5 text-xs font-medium">
            <span className="text-violet-500">[00:00]</span>
            <span className="text-gray-700">
              Hey team, quick update from today’s sprint planning meeting.
            </span>
          </div>

          <div className="tracking[-.8px] space-x-0.5 text-xs font-medium">
            <span className="text-violet-500">[00:00]</span>
            <span className="text-gray-700">
              Hey team, quick update from today’s sprint planning meeting.
            </span>
          </div>

          <div className="tracking[-.8px] space-x-0.5 text-xs font-medium">
            <span className="text-violet-500">[00:00]</span>
            <span className="text-gray-700">
              Hey team, quick update from today’s sprint planning meeting.
            </span>
          </div>

          <div className="tracking[-.8px] space-x-0.5 text-xs font-medium">
            <span className="text-violet-500">[00:00]</span>
            <span className="text-gray-700">
              Hey team, quick update from today’s sprint planning meeting.
            </span>
          </div>
        </TabsContent>

        <TabsContent contentKey="description">
          <div className="tracking[-.8px] text-sm font-medium">{description}</div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
