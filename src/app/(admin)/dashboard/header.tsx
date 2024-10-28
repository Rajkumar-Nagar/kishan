"use client"
import React from 'react'
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDarkTheme, useWindowSize } from '@/hooks'


const DashboardHeader = () => {
	const pathname = usePathname() ?? "";
	const pathSegments = pathname.split('/').filter(segment => segment);
	const { width } = useWindowSize();
	const [open, setOpen] = React.useState(false);

	const ITEMS_TO_DISPLAY = width > 720 ? 4 : width > 480 ? 3 : 2;

	const items = pathSegments.map((segment, index) => ({
		href: `/${pathSegments.slice(0, index + 1).join('/')}`,
		label: segment,
	}));
	useDarkTheme();
	return (
		<header className="flex h-16 sticky top-0 z-50 backdrop-blur-md shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1 dark:text-white" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href={items[0].href}>{items[0].label}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>

						{items.length > ITEMS_TO_DISPLAY ? (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<DropdownMenu open={open} onOpenChange={setOpen}>
										<DropdownMenuTrigger
											className="flex items-center gap-1"
											aria-label="Toggle menu"
										>
											<BreadcrumbEllipsis className="h-4 w-4" />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start">
											{items.slice(1, -ITEMS_TO_DISPLAY + 1).map((item, index) => (
												<DropdownMenuItem key={index}>
													<Link href={item.href ? item.href : "#"}>
														{item.label}
													</Link>
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</BreadcrumbItem>
							</>
						) : null}

						{items.slice(items.length > ITEMS_TO_DISPLAY ? -ITEMS_TO_DISPLAY + 1 : 1, -1).map((item, index) => (
							<React.Fragment key={index}>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink
										asChild
										className="max-w-20 truncate md:max-w-none"
									>
										<Link href={item.href}>{item.label}</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
							</React.Fragment>
						))}

						{items.length > 1 && <>
							<BreadcrumbSeparator />
							<BreadcrumbItem >
								<BreadcrumbPage className="max-w-20 truncate md:max-w-none">
									{items.at(-1)!.label}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</>}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	)
}

export default DashboardHeader
