import Avatar from 'react-avatar'


// eslint-disable-next-line react/prop-types
function User({ username, isOnline }) {
    return (
        <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-accent/50 hover:shadow-sm">
            <div className="relative">
                <div className="ring-2 ring-border/30 rounded-full transition-all group-hover:ring-accent-foreground/20">
                    <Avatar name={username} size="36" round={true} />
                </div>
                {isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background shadow-sm animate-pulse"></div>
                )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-foreground truncate group-hover:text-accent-foreground transition-colors">
                    {username}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-muted-foreground/50'}`}></div>
                    <span className="text-xs text-muted-foreground">
                        {isOnline ? "Active now" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default User