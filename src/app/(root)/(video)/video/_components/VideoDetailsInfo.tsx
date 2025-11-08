"use client";

import EmptyState from "@/components/EmptyState";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/Tabs";
import { formateTranscriptString } from "@/lib/utils";
import TransxriptIcon from '@/assets/icons/copy.svg';

export default function VideoDetailsInfo({
  description,
  transcript,
}: {
  description?: string;
  transcript?: string;
}) {
  const formatedTranscript = formateTranscriptString(transcript!);

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
      <div className="max-h-[300px] min-h-[300px] overflow-y-auto">
        <TabsContent contentKey="trasnscript" className="space-y-5">
          {formatedTranscript.length > 0 ? (
            formatedTranscript.map((item, index) => (
              <div
                key={index}
                className="tracking[-.8px] space-x-0.5 text-xs font-medium"
              >
                <span className="text-violet-500">[{item.time}]</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))
          ) : (
            <EmptyState
              icon={TransxriptIcon}
              title="No trascript found"
              description="This video does not contain any trascript !"
            />
          )}
        </TabsContent>

        <TabsContent contentKey="description">
          <div className="tracking[-.8px] text-sm font-medium">
            {description}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
