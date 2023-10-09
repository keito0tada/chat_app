import { Database } from '@/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
export default function MemberList({
    profiles,
}: {
    profiles: Profile[] | null;
}) {
    return (
        <div className="flex-none flex flex-col w-32 bg-green-100">
            {profiles === null
                ? undefined
                : profiles.map((value, index) => {
                      return (
                          <div className="px-1" key={index}>
                              {value.name}
                          </div>
                      );
                  })}
        </div>
    );
}
