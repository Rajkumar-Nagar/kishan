"use client"
import React from 'react'
import {
	Breadcrumb,
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

const DashboardHeader = () => {
	const pathname = usePathname() ?? "";
	const pathSegments = pathname.split('/').filter(segment => segment);

	return (
		<header className="flex h-16 sticky top-0 z-50 backdrop-blur-md shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1 dark:text-white" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						{
							pathSegments.slice(0, -1).map((segment, index) => (
								<React.Fragment key={segment}>
									<BreadcrumbItem>
										<BreadcrumbLink asChild>
											<Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
												{segment}
											</Link>
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</React.Fragment>
							))
						}
						<BreadcrumbItem>
							<BreadcrumbPage>
								{pathSegments[pathSegments.length - 1]}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	)
}

export default DashboardHeader
